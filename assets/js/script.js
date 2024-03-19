Vue.component ('card-movie', {
    template :
     `
     <ul class="list-group">
     <li class="list-group-item">{{title}}</li>
   `,
    props: ['title']
})

var app = new Vue({
    el: '#app',
    data: {
        categories: [],
        titles: [],
        templateImg: 'https://image.tmdb.org/t/p/w220_and_h330_face/',
        finalImg: '',
        movieDesc: [],
        placements : [],
        movieOrder: [],
    },
    mounted(){
        this.getMoviesCategories()
        if (localStorage.placements) {
            this.placements = localStorage.placements;
          }
    },
    methods: {
        getMoviesCategories() {
            const options = {
                method: 'GET',
                url: 'https://api.themoviedb.org/3/genre/movie/list',
                params: { language: 'fr' },
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDI4OTQ0OGRhZmUwNjUwYWQ2NDhiMDgyNmI1ZWU2OCIsInN1YiI6IjY1ZjdmY2IzMjQyZjk0MDE3ZGNlNjkzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DWhiyL63HcSIOon_lZEbOD_H93qLB31-zpTcKaMxfwM'
                }
            };

            axios
                .request(options)
                .then(response => {
                    this.categories = response.data.genres
                    console.log(response.data);
                }) 
                .catch(function (error) {
                    console.error(error);
                });
        },
        getMovies(categorie) {
            console.log(categorie)
            const options = {
                method: 'GET',
                url: 'https://api.themoviedb.org/3/discover/movie',
                params: { with_genres: categorie.target.value, 
                          include_adult: 'false', 
                          language: 'fr-FR', 
                          page: '1', 
                          sort_by: 'vote_average.desc',
                                    'vote_count.gte': 300,  
                          with_original_language: 'fr'},
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDI4OTQ0OGRhZmUwNjUwYWQ2NDhiMDgyNmI1ZWU2OCIsInN1YiI6IjY1ZjdmY2IzMjQyZjk0MDE3ZGNlNjkzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DWhiyL63HcSIOon_lZEbOD_H93qLB31-zpTcKaMxfwM'
                }
            };

            axios
                .request(options)
                .then(response => {
                    this.titles = []
                    for (movie of response.data.results.splice(0, 10)) {
                        this.titles.push(movie.title)
                        //this.finalImg = this.templateImg + movie.poster_path
                        console.log(movie.title)
                        //console.log(this.finalImg)
                        this.movieOrder = response.data.results.map((x) => x.title);
                        console.log(this.movieOrder)
                    }
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
        persist() {
            this.placements = this.movieOrder
            localStorage.placement = this.placements;
            console.log('Stockage ?');
            console.log(this.placements);
          },
    },
})     