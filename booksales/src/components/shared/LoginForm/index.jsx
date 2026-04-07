const LoginForm = () => {
    const style = {
        form: {
            display: "flex",
            flexDirection: "column",
            maxWidth: "400px",
            margin: "0 auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
        },
        input: {
            padding: "10px",
            fontsize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginBottom: "10px",
        },
        button: {
            padding: "10px",
            fontsize: "16px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
        }
    };
    return (
        <form style={style.form}>
            <input style={style.input} type="text" className="form-control mb-3" placeholder="Username" />
            <input style={style.input} type="email" className="form-control mb-3" placeholder="Email" />
            <input style={style.input} type="password" className="form-control mb-3" placeholder="Password" />
            <button style={style.button} type="submit" className="btn btn-primary w-100">Login</button>
        </form>
    );
}

export default LoginForm;