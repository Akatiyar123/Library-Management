const BookPage = Vue.component('BookPage', {
    template:
        `
    <div>
    <div v-for="(book, index) in books" class="col-md-4 mb-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ book.book_name }}</h5>
        <p class="card-text"><strong>Author(s):</strong> {{ book.book_authors }}</p>
        
        <button @click="request(book.id)" class="btn btn-primary">Request</button>

      </div>
    </div>
</div>
    </div>
    `,
    data() { 
        return{
        books : []}
    },

    created() {
        // Fetch sections from API when the component is created
        this.getbooks();
      },
    methods:{
        async getbooks() {
            try {
              const response = await fetch('http://127.0.0.1:5000/api/user-books'); // Replace 'api/sections' with your API endpoint
              if (!response.ok) {
                throw new Error('Failed to fetch sections');
              }
              const data = await response.json();
              console.log(data)
              this.books = data; // Assuming the response contains an array of sections
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
      
        }
    
})
export default BookPage;
