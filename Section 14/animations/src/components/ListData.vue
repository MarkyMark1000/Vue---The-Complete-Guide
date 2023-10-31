<template>
    <!--<ul>-->
        <!--
            <transition-group> is similar to transition, but it is for working with
            multiple items transitioning, such as all of the list items in a list.
            You need to render them to an element, in this case a ul.   This is
            specified in the key attribute.   The <ul> parent is removed.
        -->
        <transition-group tag="ul" name="user-list">
            <li v-for="user in users" :key="user" @click="removeUser(user)">
                {{  user }}
            </li>
        </transition-group>
    <!--</ul>-->
    <div>
        <input type="text" ref="userNameInput"/>
        <button @click="addUser">Add User</button>
    </div>
</template>

<script>

export default {
    data() {
        return {
            users: ['Max', 'Manu', 'Julie', 'Angela', 'Michael']
        };
    },
    methods: {
        removeUser(user) {
            this.users = this.users.filter(usr=>usr!==user);
        },
        addUser() {
            const enteredUserName = this.$refs.userNameInput.value;
            this.users.unshift(enteredUserName);
        }
    }
}
</script>

<style scoped>
ul {
    list-style: none;
    margin: 1rem;
    padding: 0;
}
li {
    border: 1px solid lightgrey;
    padding: 1rem;
    text-align: center;
}

.user-list-enter-from{
    opacity: 0;
    transform: translateX(-30px);
}
.user-list-enter-active{
    transition: all 1s ease-out;
}
.user-list-leave-active {
    transition: all 1s ease-in;
    position: absolute;     /* necessary to get *-move working fully */
}
.user-list-enter-to,
.user-list-leave-from {
    opacity: 1;
    transform: translateX(0);
}
.user-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
/*
The previous css is great for moving individual items, but it doesn't deal with
the fact that when something has been removed, there is a jump from say the bottom
list item upwards.   We have a new element *-move to deal with this:

It works for adding items but is still jumpy when removing them.   We need to
adjust the leave-active css above to have position: absolute.
 */
 .user-list-move {
    /*
    transform is used by default in this class, we need to transitiion the movement
     */
    transition: transform 0.8s ease;

 }
</style>