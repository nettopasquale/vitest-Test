import { Appointment } from "../entities/appointment";
import { AppointmentsRepository } from "../repositories/appointments-repository";

interface CreateAppointmentRequest{
    customer: string;
    startsAt: Date;
    endsAt: Date;
}

//The appointment response is always the response itself
type CreateAppointmentResponse = Appointment

export class CreateAppointment{
    constructor(
        private appointmentsRepository: AppointmentsRepository
    ){}

    async execute({
        customer, 
        startsAt, 
        endsAt
    }: CreateAppointmentRequest): Promise<CreateAppointmentResponse>{
        const overlappingAppointment = await this.appointmentsRepository.findOverlappingAppointment(
            startsAt,
            endsAt,
        )
        if(overlappingAppointment){
            throw new Error('Another appointment overlaps this appointments date')
        }

        const appointment = new Appointment({
            customer, 
            startsAt, 
            endsAt,
        })

        await this.appointmentsRepository.create(appointment)

        return appointment
    }
}