const getGreetings = () => {

    const userEmailName = localStorage.getItem('email')
    let name = ''
    if (userEmailName) {
        name = userEmailName.split('@')[0]
        name = name.toUpperCase()
    }

    const date = new Date()
    const showTime = date.getHours()
    if (showTime >= 0 && showTime < 12) {
        return `Good Morning ${name}`
    } else if (showTime >= 12 && showTime < 18) {
        return `Good Afternoon ${name}`
    }
    else if (showTime >= 18 && showTime < 24) {
        return `Good Evening ${name}`
    }
}

export default getGreetings;