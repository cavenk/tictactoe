interface Props {
    value : Turn | null,
    onClick : () => void
}

export function Cell({value, onClick} : Props){
    return (
        <div className="cell d-flex justify-content-center align-items-center" onClick={onClick}>
            <b>{value}</b>    
        </div>
    )
}