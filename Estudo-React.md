# Estudo de React
https://pt-br.reactjs.org/docs

## Criar um BluePrint de React App
https://github.com/facebook/create-react-app

	npx create-react-app my-app
	cd my-app
	npm start


### React Router DOM
Pacote para utilizar rotas no React

**BrowserRouter**

Insere onde deseja renderizar as rotas (blog/2.0 > App.js)

**Route**

Insere o Route para criar as rotas (blog/2.0 > Blog.js)

	<Route path="/" exact render={()=><h1>Teste</h1>} />
	<Route path="/" exact component={Posts} />
*Utilize o exact para definir um caminho exato*

**WithRouter**

insere em Componentes filhos para receberem informações das rotas (blog/2.0 > Post.js)

	export default withRouter(post);

**Link**

Insere o link onde deseja criar um link (tipo um a href)

	<Link to="/">Home</Link>
	<Link to={{
			pathname: "/new-post",
			// hash: "#submit",
			// search: '?quick-submit=true'
		}}
	>New Post</Link>

**NavLink**

Igual ao Link mas possibilita estilizar o link com classe .active(blog/2.0 > Blog.js)

*Se quiser mudar o nome da classe "active" você pode utiizar o parâmetro "activeClassName"*

	<NavLink to="/" exact activeClassName="my-active-class">Home</NavLink>

*Ou mudar o stilo inline com o parâmetro "activeStyle"*

	<NavLink to="/" exact activeStyle={{
		color: '#fa923f',
		textDecoration: 'underline'
	}}>Home</NavLink>

**Switch**

Usado nas rotas quando deseja que somente uma rota seja carregada (no comportamento normal, todas as rotas que atendem ao critério são carregadas) (blog/2.0 > Blog.js)

**Redirect**

Usado para redirecionar uma rota ou para um componente (blog/2.0 > Blog.js, blog/2.0 > NewPost.js)

### Lazy Loading Components

Forma de importar componentes de forma assíncrona utilizando React.lazy e Suspense(blog/2.0 > Blog.js)