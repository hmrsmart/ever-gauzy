import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	NbButtonModule,
	NbIconModule,
	NbSelectModule,
	NbTooltipModule
} from '@nebular/theme';
import { ThemeSettingsComponent } from './theme-settings.component';
import { TranslateModule } from './../../../../@shared/translate/translate.module';
import { ThemeLanguageSelectorModule } from './components/theme-language-selector.module';
import { ThemeSelectorModule } from './components/theme-selector/theme-selector.module';
import { NbCardModule, NbListModule } from '@nebular/theme';
import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';
import { LayoutSelectorComponent } from './components/layout-selector/layout-selector.component';

@NgModule({
	imports: [
		CommonModule,
		NbButtonModule,
		NbSelectModule,
		NbIconModule,
		NbTooltipModule,
		TranslateModule,
		ThemeLanguageSelectorModule,
    ThemeSelectorModule,
    NbCardModule,
    NbListModule
	],
	exports: [
		ThemeSettingsComponent,
    ThemeSelectorComponent,
    LayoutSelectorComponent
	],
	declarations: [
		ThemeSettingsComponent,
    LayoutSelectorComponent
	],
	providers: []
})
export class ThemeSettingsModule {}
