import { Component } from '@angular/core';
interface MakeReadyPost {
  lease: Lease;
  unit: Unit;
}

interface Lease {
  moveInDate: Date | null;
  moveOutDate: Date | null;
  lastMoveOutDate: Date | null;
}

interface Unit {
  leases: Lease[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'test-strict-cli';

  getNextMoveInDate(makeReadyPost: MakeReadyPost): void {
    const lastMoveOutLease = makeReadyPost.lease;

    const LastMoveOutDate = lastMoveOutLease
      ? lastMoveOutLease.moveOutDate
      : null;

    if (lastMoveOutLease && LastMoveOutDate) {
      let nextMoveInLease: Lease[] | null;

      if (makeReadyPost.unit.leases) {
        nextMoveInLease = makeReadyPost.unit.leases.filter(
          (lease) => {
            if (lease.moveInDate === null) {
              throw new Error('Unexpected null encountered!');
            }

            return lease.moveInDate &&
            //  new Date(lease.moveInDate) > new Date(lastMoveOutLease.moveOutDate)
            new Date(lease.moveInDate) > new Date(LastMoveOutDate);
          }
        );

        // tslint:disable-next-line: no-unused-expression
        nextMoveInLease.sort(
          (a, b) => {
            if (a.moveInDate === null || b.moveInDate === null) {
              throw new Error('Unexpected null encountered!');
            }

            return new Date(a.moveInDate).getTime() - new Date(b.moveInDate).getTime();
          }
        )[0];
      }
    }
  }

  getNextMoveInDateOld(makeReadyPost: MakeReadyPost): void {
    const lastMoveOutLease = makeReadyPost.lease;

    const LastMoveOutDate = lastMoveOutLease
      ? lastMoveOutLease.moveOutDate
      : null;

    if (lastMoveOutLease && LastMoveOutDate) {
      // let nextMoveInLease: Lease[] | null;

      if (makeReadyPost.unit.leases) {
        const val = makeReadyPost.unit.leases.filter(
          (lease) =>
            lease.moveInDate &&
            new Date(lease.moveInDate) > new Date(lastMoveOutLease.moveOutDate)
        );

        // tslint:disable-next-line: no-unused-expression
        val.sort(
          (a, b) =>
            new Date(a.moveInDate).getTime() - new Date(b.moveInDate).getTime()
        )[0];
      }
    }
}
