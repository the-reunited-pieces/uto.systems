export function LifeStats() {
    const now = new Date();

    const age =
        now.getFullYear() - 2003 + (now.getMonth() < 7 || (now.getMonth() === 7 && now.getDate() < 19) ? -1 : 0);

    return (
        <>
            <h2>Life Stats</h2>
            <p>
                <b>Age:</b> {age}
                <br />
                <b>Country:</b> Netherlands 🇳🇱
            </p>
        </>
    );
}
