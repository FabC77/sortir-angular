import { Injectable } from '@angular/core';
import { EventStatus } from '../core/model/eventstatus.enum';

@Injectable({
  providedIn: 'root'
})
export class EventStatusService {

  constructor() { }
  private statusTranslations: { [key in EventStatus]: string } = {
    [EventStatus.IN_PROGRESS]: 'En cours',
    [EventStatus.DRAFT]: 'Brouillon',
    [EventStatus.CLOSED]: 'Clôturé',
    [EventStatus.CANCELLED]: 'Annulé',
    [EventStatus.FINISHED]: 'Terminé',
    [EventStatus.OPEN]: 'Ouvert',
    [EventStatus.ARCHIVED]: 'Archivé'
  };

  getStatusTranslation(status: EventStatus): string {
    return this.statusTranslations[status] || status;
  }
}
