export interface AppointmentProps{
    customer: string;
    startsAt: Date;
    endsAt: Date;
}

export class Appointment{

    constructor(props: AppointmentProps){
        const {startsAt, endsAt} = props

        if(endsAt <= startsAt ){
            throw new Error('Invalid end date')
        }

        if( startsAt <= new Date()){
            throw new Error('Invalid end date')
        }
        
        this.props = props
    }

    private props: AppointmentProps

    get customer(){
        return this.props.customer
    }
    get startsAt(){
        return this.props.startsAt
    }
    get endsAt(){
        return this.props.endsAt
    }

}