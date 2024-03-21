

export function TodoPreview({todo}) {

    return <article>
        <h4>{todo.title}</h4>
        <h1>📃</h1>
        <p>Severity: <span>{todo.severity}</span></p>
    </article>
}