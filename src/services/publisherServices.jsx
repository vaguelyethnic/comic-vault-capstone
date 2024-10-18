export const getAllPublishers = () => {
    return fetch('http://localhost:8088/publishers').then((res) => res.json())
}