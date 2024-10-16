import ICustomerInterface from "./customer-interface";

export default class CustomermModel implements ICustomerInterface {
    constructor(
        public id: number,
        public name: string,
        public lastName: string,
        public dateOfBirth: Date,
        public gender: string
    ) { };
};