import {expect, test} from 'vitest';
import { getFutureDate } from '../utils/get-future-date';
import { Appointment } from './appointment';

test('create an appointment', ()=>{
    const startsAt = getFutureDate('2022-11-14')
    const endsAt = getFutureDate('2022-11-15')

    const appointment = new Appointment({
        customer: 'Pasquale',
        startsAt,
        endsAt,
    })

    expect(appointment).toBeInstanceOf(Appointment);
    expect(appointment.customer).toEqual('Pasquale');
})

test('cannot create an appointment with end date before start date',()=>{
    const startsAt = getFutureDate('2022-11-14')
    const endsAt = getFutureDate('2022-11-13')

    expect(() =>{
        return new Appointment({        
            customer: 'Pasquale',
            startsAt,
            endsAt,
        })
    }).toThrow()
})

test('cannot create an appointment with start date before now', ()=>{
    const startsAt = new Date();
    const endsAt = new Date();

    startsAt.setDate(startsAt.getDate() - 1)
    endsAt.setDate(endsAt.getDate() + 3)

    expect(() =>{
        return new Appointment({        
            customer: 'Pasquale',
            startsAt,
            endsAt,
        })
    }).toThrow()
})