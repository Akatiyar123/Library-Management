const UserHome = Vue.component('user', {
  template: `
  <div>

  
  <button @click="showallbooks" type="button" class="btn btn-info">Show All Books</button>
  <button @click="showstatus" type="button" class="btn btn-info">Show Status</button>


  <h1>Book Sections</h1>
  
  
  <div v-for="section in sections" :key="section.id" class="card mb-3">
    <div class="card-header">
      <h2>{{ section.section_name }}</h2>




    </div>
    <div class="card-body">
      <p class="card-text">{{ section.section_description }}</p>
      <div class="row">
        <div v-for="(book, index) in section.books.slice(0, showAllBooks ? section.books.length : 3)" :key="index" class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ book.book_name }}</h5>
              <p class="card-text"><strong>Author(s):</strong> {{ book.book_authors }}</p>
              
              <button @click="request(book.id)" class="btn btn-primary">Request</button>

            </div>
          </div>
        </div>
      </div>
      <button v-if="!showAllBooks && section.books.length > 3" @click="showAllBooks = true" class="btn btn-info mt-3">Show All</button>
    </div>



    </div>

<br/>

  </div>
  `,
  data() {
    return {
      sections: [] ,
      showAllBooks: false,
      // Assuming this data will be fetched from the API
    };
  },
  created() {
    // Fetch books from API when the component is created
    this.fetchSections();
  },
  methods: {
    async fetchSections() {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/user-sections'); // Replace 'api/sections' with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch sections');
        }
        const data = await response.json();
        console.log(data)
        this.sections = data; // Assuming the response contains an array of sections
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    },







    request(book_id){



      fetch(`http://127.0.0.1:5000/api/issue-book/${book_id}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authentication-Token':  localStorage.getItem('auth-token'),
                  
                },
                
            })
            .then(response => response.json())
            .then(data => {
                this.$store.dispatch('flash_message', data.message)

            })
            .catch(e => console.log(e))
        },

        showallbooks(){
          this.$router.push({ path: '/book_page' })
    
        },

        showstatus(){
          this.$router.push({ path: '/manage_book' })
    
        },



    
  }
});

export default UserHome;
