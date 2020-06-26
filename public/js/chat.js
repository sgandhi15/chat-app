const socket = io()

const autoScroll = () => {
    const $newMessage = document.querySelector('#messages').lastElementChild

    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageheight = $newMessage.offsetHeight + newMessageMargin

    const visibleHeight = document.querySelector('#messages').offsetHeight

    const containerHeight = document.querySelector('#messages').scrollHeight

    const scrollOffset = document.querySelector('#messages').scrollTop + visibleHeight

    if(containerHeight - newMessageheight <= scrollOffset) {
        document.querySelector('#messages').scrollTop = document.querySelector('#messages').scrollHeight
    }
}

const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(document.querySelector('#message-template').innerHTML, { 
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('hh:mm A')
    })
    document.querySelector('#messages').insertAdjacentHTML('beforeend',html)
    autoScroll()
})

socket.on('locationMessage', (url) => {
    console.log(url)
    const html = Mustache.render(document.querySelector('#location-template').innerHTML, {
        username: url.username,
        url: url.url,
        createdAt: moment(url.createdAt).format('hh:mm A')
    })
    document.querySelector('#messages').insertAdjacentHTML('beforeend',html)
    autoScroll()
})

socket.on('roomData', ({ room, users }) => {
    const html = Mustache.render(document.querySelector('#sidebar-template').innerHTML, {
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()

    document.querySelector('#send-message').setAttribute('disabled', 'disabled')

    const message = document.querySelector('#message').value
    socket.emit('sendMessage', message, () => {
        document.querySelector('#send-message').removeAttribute('disabled')
        document.querySelector('#message').value = ''
        document.querySelector('#message').focus()
        console.log('Message was Delivered!')
    })
})

document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser')
    }
    
    document.querySelector('#send-location').setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            document.querySelector('#send-location').removeAttribute('disabled')
            console.log('Location Shared!')
        })
    })
})

socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})