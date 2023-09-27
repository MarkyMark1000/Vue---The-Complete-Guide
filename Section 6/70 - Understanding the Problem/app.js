const app = Vue.createApp({
    data() {
        return {
            friends: [
                {
                    id: 'Manuel',
                    name: 'Manuel Lorenz',
                    phone: '01234 5678 991',
                    email: 'manuel@localhost.com'
                },
                {
                    id: 'Julie',
                    name: 'Julie Jones',
                    phone: '09876 543 221',
                    email: 'julie@localhost.com'
                }
            ]
        };
    }


});

/*
    We add a component to the view app.   It needs two arguments.   The first is the
    new html tag we are going to use.   There are not html tags with words, so it is
    good practice to use something with a '-' in.   The next part are methods, data
    etc that we would normally use to define an app, but which instead defines this
    local component functionality.
*/
app.component(
    'friend-contact',
    {
        /*
        Problem arises here, with button @click in html - it prints out a
        button for each friend, but typically if you use something like @click,
        it will call the same method for all of the buttons and potentially
        haid all of the details.   This is where you need components.

        Important:   Typically you will build either a page that contains multiple
        vue apps that are independent of each other OR Single Page Applications that
        use a single vue app, but multiple components.   It's not create to
        combine multiple apps and components because they can't inter-communicate.
        */
        template: `
        <li>
          <h2>{{ friend.name }}</h2>
          <button @click="toggleDetails()">
            {{ detailsAreVisible ? 'Hide' : 'Show'}} Details
          </button>
          <ul v-show='detailsAreVisible'>
            <li><strong>Phone:</strong> {{ friend.phone }}</li>
            <li><strong>Email:</strong> {{ friend.email }}</li>
          </ul>
        </li>
        `,
        data() {
            return {
                detailsAreVisible: true,
                friend:
                    {
                        id: 'Manuel',
                        name: 'Manuel Lorenz',
                        phone: '01234 5678 991',
                        email: 'manuel@localhost.com'
                    }
            };
        },
        methods: {
            toggleDetails(){
                this.detailsAreVisible = !this.detailsAreVisible;
            }
        }
    }
);

app.mount('#app');