import {expect, test} from 'vitest';
import {getFutureDate} from './get-future-date'

test('increases day with one year', ()=>{
    const year = new Date().getFullYear()
    expect(getFutureDate(`${year}-11-14`).getFullYear()).toEqual(2023)
})