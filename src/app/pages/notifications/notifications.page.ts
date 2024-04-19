import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage {
  notifications = [
    { title: 'New message from John', time: '10:00 AM' },
    { title: 'Reminder: Team meeting at 2 PM', time: 'Yesterday' },
    { title: 'Reminder: Team meeting at 2 PM', time: 'Yesterday' },
    { title: 'Reminder: Team meeting at 2 PM', time: 'Yesterday' },
    // Add more mock notifications or retrieve them from a service
  ];

  constructor() {}
}
