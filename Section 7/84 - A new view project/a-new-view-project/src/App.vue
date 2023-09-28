<template>
    <section>
        <h2>My Friends</h2>
        <ul>
            <li></li>
        </ul>
    </section>
</template>

<!--
 Here we use export default to export the information we are going to
 pass to the Vue app.
-->

<script>
export default {
    data(){
        return {
            friends: [
                {
                    id: 'manuel',
                    name: 'Manuel Lorenz',
                    phone: '01234 567891',
                    email: 'manuel@localhost.com'
                },
                {
                    id: 'julie',
                    name: 'Julie Jones',
                    phone: '09876 543210',
                    email: 'julie@localhost.com'
                },
            ]
        };
    }
}
</script>