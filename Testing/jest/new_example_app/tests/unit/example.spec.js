import { mount, shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import App from '../../src/App.vue'

// It is good practice to have a sanity test.   This ensures
// a simple result.   If it fails we know there is a problem
// with the tools and not our code
describe('Sanity Test', () => {
  it('Sanity Test', () => {
    expect(true).toBe(true);
  })
})

// test is built in functionality
test('Expect 1 + 1 = 2', () => {
  expect(1+1).toBe(2);
})

// can use it instead of inspect
it('Expect 2 + 2 = 4', () => {
  expect(2+2).toBe(4);
})

// example of describe it syntax
describe('Example describe it', () => {
  it('Expect 1 + 1 = 2', () => {
    expect(1+1).toBe(2);
  }),
  it('Expect 1 + 1 != 3', () => {
    expect(1+1).not.toBe(3);
  }),
  // To skip a test, put an x at the front, will show in results.
  xit('Expect 2 + 2 = 4', () => {
    expect(2+2).toBe(4);
  })
})

describe('App.vue', () => {
  it('renders text: Welcome to Your Vue.js App', () => {
    const wrapper = mount(App);
    expect(wrapper.text()).toContain('Welcome to Your Vue.js App')
  })
  // if only want to test if a component exists in the page, use if
  it('check paragraph exists', () => {
    const wrapper = mount(App);
    if(expect(wrapper.find('p').exists()).toBeTruthy())
    {
      expect(wrapper.text()).toContain('For a guide');
    }
  }),
  // test that Hello World is rendered within a child component
  it('renders hello world within a child', () => {
    const wrapper = mount(App);
    const greet = wrapper.getComponent({name: 'GreetingMessage'});
    
    if(expect(greet.find('p').exists()).toBe(true)) {
      expect(greet.text()).toBe('Hello World');
    }
  }),
  // contains computed property within the text
  it('Contains computed property Mark Wilson', () => {
    const wrapper = mount(App);
    // this will fail if 'Mark Wilson' is not within the text
    expect(wrapper.text()).toContain('Mark Wilson');
  }),
  // test computed property directly
  it('Contains computed value John Doe', () => {
    // cannot use this, not defined yet, so create sample values
    const testValues = {
      firstName: 'John',
      lastName: 'Doe'
    };

    expect(App.computed.fullName.call(testValues)).toBe('John Doe');

  })
  // test for pops
  it('New Greeting prop', () => {
    // This fails if greeting prop isn't within App
    const wrapper = mount(App, {
      props: {
        greeting: 'Blah de Blah'
      }
    })
    expect(wrapper.text()).toContain('Blah de Blah')
  })
})

// It is common practice to use the component we are testing in the
// describe text.
describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
