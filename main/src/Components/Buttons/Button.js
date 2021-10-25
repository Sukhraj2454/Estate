import './Button.css'

const Button = function ({ text, onClick }) {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

Button.defaultProps = {
    text: 'Click Me!',
    onClick: () => { }
}
export default Button;

