import {describe, expect, it} from 'vitest';
import { Appointment } from '../entities/appointment';
import { InMemoryAppointmentsRepository } from '../repositories/in-memory/in-memory-repository';
import { getFutureDate } from '../utils/get-future-date';
import { CreateAppointment } from './create-appointment';

//test or it
describe('create appointment', ()=>{
    it('should be able to create an appointment', ()=>{
        const appointmentsRepository = new InMemoryAppointmentsRepository();
        const createAppointment = new CreateAppointment(appointmentsRepository);

        const startsAt = getFutureDate('2022-11-14');
        const endsAt = getFutureDate('2022-11-15');

        expect(createAppointment.execute({
            customer: "Pasquale",
            startsAt,
            endsAt
        })).resolves.toBeInstanceOf(Appointment)
    })
    it('should not be able to create an appointment with overlapping dates', async()=>{
        const startsAt = getFutureDate('2022-11-14');
        const endsAt = getFutureDate('2022-11-15');

        const appointmentsRepository = new InMemoryAppointmentsRepository();
        const createAppointment = new CreateAppointment(appointmentsRepository);

        await(createAppointment.execute({
            customer: "Pasquale",
            startsAt,
            endsAt
        }))

        expect(createAppointment.execute({
            customer: 'Pasquale',
            startsAt: getFutureDate('2022-11-14'),
            endsAt: getFutureDate('2022-11-15')
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer: 'Pasquale',
            startsAt: getFutureDate('2022-11-14'),
            endsAt: getFutureDate('2022-11-17')
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer: 'Pasquale',
            startsAt: getFutureDate('2022-11-01'),
            endsAt: getFutureDate('2022-11-17')
        })).rejects.toBeInstanceOf(Error)
    })
})