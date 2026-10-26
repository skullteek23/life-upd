export interface IAction { action: () => void }

export type ActionOutletContext = {
    submission: [isSubmit: boolean, setIsSubmit: (value: boolean) => void],
    refresh: [isRefresh: boolean, setIsRefresh: (value: boolean) => void]
}