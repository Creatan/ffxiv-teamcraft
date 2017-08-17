import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ListRow} from '../model/list-row';
import {I18nTools} from '../core/i18n-tools';
import {TranslateService} from '@ngx-translate/core';
import {GatheredByPopupComponent} from '../gathered-by-popup/gathered-by-popup.component';
import {MdDialog} from '@angular/material';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class ItemComponent {

    @Input()
    item: ListRow;

    @Output()
    update: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    done: EventEmitter<any> = new EventEmitter<any>();

    constructor(private i18n: I18nTools, private translator: TranslateService, private dialog: MdDialog) {
    }

    public setDone(row: ListRow, amount: number) {
        this.done.emit({row: row, amount: amount});
    }

    public getName(item: ListRow) {
        return this.i18n.getName(item.name);
    }

    public openGatheredByDetails(item: ListRow): void {
        this.dialog.open(GatheredByPopupComponent, {
            data: item
        });
    }

    public getXivdbDomain(): string {
        if (this.translator.currentLang === 'en') {
            return 'www';
        }
        return this.translator.currentLang;
    }
}
