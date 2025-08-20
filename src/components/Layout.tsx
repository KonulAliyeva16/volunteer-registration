import Form from "./Step1";
function Layout() {
    return (
        <div>
            <main >
                <div className="form-content container d-flex flex-column align-items-center justify-content-center">
                    <h1>Volunteer Registration</h1>
                    <Form />
                    <button type="submit">Next</button>
                </div>

            </main>
        </div>
    );
}

export default Layout;