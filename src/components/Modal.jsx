import '../styles/Modal.scss'

export default function Modal({children, visible, setVisible}){

    return (
        <div className={["modal", visible && 'visible'].join(' ')} onClick={() => setVisible(false)}>
            {children}
        </div>
    )
}