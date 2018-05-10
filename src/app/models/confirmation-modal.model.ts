export interface IConfirmationModal {
    title: string;
    question: string;
    confirmMessage: string;
    cancelMessage: string;
    confirm?: Function;
    cancel?: Function;
}
