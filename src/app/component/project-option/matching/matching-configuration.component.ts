import * as _ from 'lodash';

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatchingConfiguration } from '../../../model/configuration/matching-configuration.model';
import { Matching, MATCHINGS } from '../../../model/matching/matching.model';
import { BoardConfiguration } from '../../../model/configuration/board-configuration.model';

@Component({
    selector: 'app-matching-configuration',
    templateUrl: './matching-configuration.component.html',
    styleUrls: ['./matching-configuration.component.scss'],
})
export class MatchingConfigurationComponent {
    @Input() boardConfiguration: BoardConfiguration;
    @Input() configuration: MatchingConfiguration;
    @Output() onChangeM = new EventEmitter<MatchingConfiguration>();
    @Output() onChangeB = new EventEmitter<BoardConfiguration>();

    availableMatchings: Matching[];

    constructor() {
        this.availableMatchings = _.values(MATCHINGS);
    }

    callbackM() {
        this.onChangeM.emit(this.configuration);
    }

    callbackB() {
        console.log("matching-configuration.component.ts", "callbackB");
        this.onChangeB.emit(this.boardConfiguration);
    }
}
