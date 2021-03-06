import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	OnInit
} from '@angular/core';
import {
	IGetTimeLogReportInput,
	ITimeLogFilters,
	ReportDayData
} from '@gauzy/contracts';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, tap } from 'rxjs/operators';
import { pluck, pick } from 'underscore';
import { TranslateService } from '@ngx-translate/core';
import * as randomColor from 'randomcolor';
import { isEmpty } from '@gauzy/common-angular';
import { moment } from './../../../../@core/moment-extend';
import { Store } from './../../../../@core/services';
import { TimesheetService } from './../../../../@shared/timesheet/timesheet.service';
import { BaseSelectorFilterComponent } from './../../../../@shared/timesheet/gauzy-filters/base-selector-filter/base-selector-filter.component';
import { IChartData } from './../../../../@shared/report/charts/line-chart/line-chart.component';
import { ChartUtil } from './../../../../@shared/report/charts/line-chart/chart-utils';
import { getAdjustDateRangeFutureAllowed } from './../../../../@theme/components/header/selectors/date-range-picker';

@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'ga-weekly-time-reports',
	templateUrl: './weekly-time-reports.component.html',
	styleUrls: ['./weekly-time-reports.component.scss']
})
export class WeeklyTimeReportsComponent extends BaseSelectorFilterComponent
	implements OnInit, AfterViewInit {

	logRequest: ITimeLogFilters = this.request;
	filters: ITimeLogFilters;
	weekLogs: ReportDayData[] = [];
	weekDays: string[] = [];
	loading: boolean;
	chartData: IChartData;

	constructor(
		private readonly timesheetService: TimesheetService,
		private readonly cdr: ChangeDetectorRef,
		protected readonly store: Store,
		public readonly translateService: TranslateService
	) {
		super(store, translateService);
	}

	ngOnInit() {
		this.cdr.detectChanges();
	}

	ngAfterViewInit() {
		this.subject$
			.pipe(
				debounceTime(500),
				tap(() => this.getWeeklyLogs()),
				tap(() => this.updateWeekDays()),
				untilDestroyed(this)
			)
			.subscribe();
	}

	updateWeekDays() {
		const { startDate, endDate } = this.logRequest;

		const start = moment(moment(startDate).format('YYYY-MM-DD'));
		const end = moment(moment(endDate).format('YYYY-MM-DD'));
		const range = Array.from(moment.range(start, end).by('day'));

		const days: Array<string> = new Array();
		let i = 0;
		while (i < range.length) {
			const date = range[i].format('YYYY-MM-DD');
			days.push(date);
			i++;
		}
		this.weekDays = days;
	}

	filtersChange(filters: ITimeLogFilters) {
		this.logRequest = filters;
		this.filters = Object.assign(
			{},
			this.logRequest,
			getAdjustDateRangeFutureAllowed(this.logRequest)
		);
		this.subject$.next(true);
	}

	async getWeeklyLogs() {
		if (!this.organization || isEmpty(this.logRequest)) {
			return;
		}
		this.loading = true;
		try {
			const appliedFilter = pick(
				this.logRequest,
				'source',
				'activityLevel',
				'logType'
			);
			const request: IGetTimeLogReportInput = {
				...appliedFilter,
				...this.getFilterRequest(this.logRequest)
			};

			const logs: ReportDayData[] = await this.timesheetService.getWeeklyReportChart(request);
			this.weekLogs = logs;
			this._mapLogs(logs);
		} catch (error) {
			console.log('Error while retriving weekly time logs reports', error);
		} finally {
			this.loading = false;
		}
	}

	/**
	* Weekly reports for employee logs
	* @param logs 
	*/
	private _mapLogs(logs: ReportDayData[]) {
		let employees = [];
		const datasets = [];

		logs.forEach((log: ReportDayData) => {
			const color = randomColor({ 
				luminosity: 'light',
				format: 'rgba',
				alpha: 0.5
			});
			employees = Object.keys(log.dates);
			datasets.push({
				label: log.employee.fullName,
				data: pluck(log.dates, 'sum').map((val) => val ? parseFloat((val / 3600).toFixed(1)) : 0),
				borderColor: color,
				backgroundColor: ChartUtil.transparentize(color, 0.5),
				borderWidth: 1
			});
		});

		this.chartData = {
			labels: employees,
			datasets: datasets
		};
	}
}
