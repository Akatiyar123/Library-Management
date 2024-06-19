const ManageBooks = Vue.component('ManageBooks', {
    template:
        `
    <div class="container-fluid mt-5">
    <div v-for="(book, index) in status" class="col-md-4 mb-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ book.books.book_name }}</h5>
        <p class="card-text"><strong>Author(s):</strong> {{ book.books.book_authors }}</p>
        <p class="card-text"><strong>Issue date:</strong> {{ book.issue_date }}</p>
        <p class="card-text"><strong>Return Date:</strong> {{ book.return_date}}</p>
        <p class="card-text"><strong>status:</strong> {{ book.status }}</p>
        <div v-if="book.status === 'issued' ">

        <button @click="viewBook(book.id)" class="btn btn-primary">View</button>
        
        
        </div>



        

      </div>
    </div>
</div>
    </div>
    `,
    data: function(){
        return {
            status : []
        }
    },
    created() {
        // Fetch books for the selected section based on the route parameter
        this.getstatus();
    },
    methods: {
        async getstatus() {

        try{
            let response = await fetch(`http://127.0.0.1:5000/api/user-requests`,{
                method:'GET',
                headers:{
                    'Authentication-Token':  localStorage.getItem('auth-token'),
                },
                
            })
            if (!response.ok){
                let data = await response.json()
                this.$store.dispatch('flash_message', data.message)
            }
            else{
                let data = await response.json()
                this.status = data
                this.$store.dispatch('flash_message', data.message)

            }

        }catch(e){
            console.log(e)
        }
      },


      viewBook(bookId) {
        // Implement view book functionality
        this.$router.push({ path: `/dashboard/${bookId}` })

        console.log('View book:', bookId);
      }
      },

        }
    
)
export default ManageBooks;
