import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';

@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'ga-onboarding',
	template: `
		<nb-layout windowMode>
			<ngx-theme-settings></ngx-theme-settings>
			<nb-layout-column>
				<router-outlet></router-outlet>
			</nb-layout-column>
		</nb-layout>
	`
})
export class OnboardingComponent implements OnInit, OnDestroy {

	constructor(private translate: TranslateService) {}

	async ngOnInit() {}

	ngOnDestroy() {}
}
