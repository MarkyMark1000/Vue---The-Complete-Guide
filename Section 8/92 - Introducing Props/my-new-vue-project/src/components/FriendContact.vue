<template>
    <!--
        The template was updated to use the prop variable names.

        Within Section 8 he talked about uni-directional data flow.
        You cannot really change variables within App.vue from the
        component easily (may be possible, but covered in later chapter),
        so we copy the value of the prop passed and then change the
        value of that local data value (friendIsFavourite) within the
        component.
    -->
    <li>
        <h2>{{ name }}{{ isFavourite ? '(favourite)' : '' }}</h2>
        <button @click="toggleDetails">
            {{ isFavourite ? 'Hide' : 'Show'}} Details
        </button>
        <button @click="toggleFavourite">
            {{ isFavourite ? 'Unfavourite' : 'Favourite'}}
        </button>
        <ul v-if="detailsAreVisible">
            <li><strong>Phone:</strong> {{ phoneNumber }}</li>
            <li><strong>Email:</strong> {{ emailAddress }}</li>
        </ul>
    </li>
</template>

<script>
export default {
    /*
    Props are like arguments that we pass to the template.   In the template
    we define email address like this: 'email-address', then within props
    this is converted to a Javascript format 'emailAddress'
    */
    /*
    props: [
        'name',
        'phoneNumber',
        'emailAddress',
        'isFavourite'
    ],
    */
    /*
        You can also pass props as an object with certain data validation features
        Supported prop types include:
        String, Number, Boolean, Array, Object, Date, Function, Symbol
    */
    props: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        emailAddress: {
            type: String,
            required: true
        },
        isFavourite: {
            type: Boolean,
            required: false,
            default: true,
            /*
            validator: function(value) {
                // validator function to ensure input is reasonable.
                return value==='0' || value==='1';
            }
            */
        }
    },
    data() {
        return {
            detailsAreVisible: false,
            // friendIsFavourite: this.isFavourite,
        };
    },
    methods: {
        toggleDetails() {
            this.detailsAreVisible = !this.detailsAreVisible;
        },
        toggleFavourite() {
            // this.friendIsFavourite = !this.friendIsFavourite;

            // This is adjusted so that the component can emit an event
            // to the parent app.   We use '-' and camel case notation.
            console.log('about to emit toggle-favourite ' + this.id);
            this.$emit('toggle-favourite', this.id);
        }
    }
};
</script>