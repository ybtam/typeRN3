export function DMY(element: Date): string{

    const date = new Date(element);

    return (date.getDate()<10?'0':'')+date.getDate() + "." +(date.getMonth()<10?'0':'')+ date.getMonth() + "." + date.getFullYear();
}

export function HM(element: Date): string{
    const date = new Date(element);

    return date.getHours()+":"+(date.getMinutes()<10?'0':'')+date.getMinutes();
}