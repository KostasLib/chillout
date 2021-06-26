import { BehaviorSubject, Subject, merge, concat, of } from 'rxjs';
import {
	map,
	debounceTime,
	distinctUntilKeyChanged,
	filter,
	distinct,
	tap,
	pairwise,
	distinctUntilChanged,
	switchMap,
	switchMapTo,
	mapTo
} from 'rxjs/operators';
import { Radio } from '../data';
import { AudioService } from '../services/audio.service';
import storage, { StorageService } from '../services/storage.service';

// TODO
// 1. split audio service to small audio ports (a. audio-api, b. storage-api). Some are not ports but logic
// 2. use in Player facade
// 3. decide when to use storage
// 4. have own audio instance to use (maybe func that returns it) (getHtMLAudio)
// 5. set doc title // not usable in RN -- is IO
// getAudioActions = (audio: HTMLAudio) => {play, pause, ...} // can re-use in RN?

// TODO
// Pairwise for prev-radio, if audio failed
// implement toggle-play (if playing & src is different -> play, else -> pause)
export class Player {
	constructor(
		private readonly _audioService: AudioService,
		private readonly _storageService: StorageService
	) {}

	// Update volume subject. Push to this subject to update the state and save to local storage.
	private _updateVolumeSubj = new BehaviorSubject<number>(0.6);
	//

	private _muteSubj = new Subject<null>();
	//

	muted$ = this._muteSubj.pipe(
		mapTo(!this._audioService.muted),
		tap((isMuted) => this._audioService.mute(isMuted))
	);

	// Keep only valid volume levels.
	private _incomingVolume$ = this._updateVolumeSubj.pipe(
		filter((vol): vol is number => typeof vol === 'number'),
		filter((v) => v >= 0 && v <= 1)
	);

	audioVolume$ = merge(this._incomingVolume$, this._storageService.volume$);
	//

	private _updateSub = this._incomingVolume$.subscribe((volume) => {
		this._audioService.volume = volume;
		this._storageService.saveVolume(volume);
	});
	//

	changeVolume(val: number) {
		this._updateVolumeSubj.next(val);
	}
	//

	// Select radio. Use undefined to pause.
	private _radioSubject = new BehaviorSubject<Radio | undefined>(undefined);
//
	activeRadio$ = merge(
		// Only emit if the radio hasn't changed, to avoid unnecessary storage calls etc.
		this._radioSubject.pipe(distinctUntilChanged((prev, curr) => prev?.id === curr?.id)),
		this._storageService.lastRadio$
	);
	//

	private readonly _sub = this._radioSubject
		.pipe(pairwise()) // Store in pairs to compare with previous radio.
		.subscribe(([prevRadio, selectedRadio]) => {
			/**
			 * Business rules:
			 * 1. If there is no selected radio, don't do anything.
			 * 2. If there is no previous radio, then this is the first time the user clicked a radio. Play it.
			 * 3. If the selected radio is the same as the previous radio, the user clicked on it twice. Pause it.
			 * 4. Else just play the selected radio.
			 */
			if (!selectedRadio) return;

			if (prevRadio?.id === selectedRadio.id && this._audioService.isPlaying) {
				this._audioService.stop();
				return;
			}
			console.log(this._audioService.volume);
			this._audioService.play(selectedRadio.source);
			this._storageService.saveLatestRadio(selectedRadio);
		});

	// use playback state
	isPlaying$ = of(this._audioService.isPlaying);
	//

	mute() {
		this._muteSubj.next(null);
	}

	select(radio: Radio) {
		this._radioSubject.next(radio);
	}

	stop() {
		this._audioService.stop();
	}

	dispose() {
		this._sub.unsubscribe();
		this._updateSub.unsubscribe();
	}
}

export default new Player(new AudioService(new Audio()), storage);