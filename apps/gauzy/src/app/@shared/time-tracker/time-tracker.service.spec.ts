import { TestBed } from '@angular/core/testing';

import { TimeTrackerService } from './time-tracker.service';

describe('TimeTrackerService', () => {
	beforeEach(() =>
		TestBed.configureTestingModule({
			teardown: { destroyAfterEach: false }
		})
	);

	it('should be created', () => {
		const service: TimeTrackerService = TestBed.get(TimeTrackerService);
		expect(service).toBeTruthy();
	});
});
