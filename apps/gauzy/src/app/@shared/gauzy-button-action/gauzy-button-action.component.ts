import { Component, OnInit, Input } from '@angular/core';
import { ComponentEnum } from '../../@core/constants/layout.constants';

@Component({
	selector: 'ngx-gauzy-button-action',
	templateUrl: './gauzy-button-action.component.html',
	styleUrls: ['./gauzy-button-action.component.scss']
})
export class GauzyButtonActionComponent implements OnInit {

	@Input() isDisable: boolean = true;
	@Input() buttonTemplate: any;
	@Input() componentName: ComponentEnum;
 	@Input() buttonTemplateVisible: any;
  	@Input() hasLayoutSelector: boolean = true;

	constructor() {}
	/**
	 * not implemented
	 */
	ngOnInit(): void {}
}
