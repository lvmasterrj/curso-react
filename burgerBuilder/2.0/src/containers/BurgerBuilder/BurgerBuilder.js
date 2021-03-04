import { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import controleDeErros from "../../hoc/controleDeErros/controleDeErros";

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};
class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	};

	componentDidMount() {
		axios
			.get(
				"https://react-my-burger-f59cb-default-rtdb.firebaseio.com/ingredients.json"
			)
			.then((res) => {
				this.setState({ ingredients: res.data });
			})
			.catch((err) => {
				this.setState({error: true})
			});
	}

	updatePurchaseState(ingredients) {
		const sum = Object.values(ingredients).reduce((sum, curr) => sum + curr);
		this.setState({ purchasable: sum > 0 });
	}

	addIngredient = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients,
		};
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchaseState(updatedIngredients);
	};

	removeIngredient = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients,
		};
		updatedIngredients[type] = updatedCount;
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchaseState(updatedIngredients);
	};

	purchase = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancel = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinue = () => {
		this.setState({ loading: true });

		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			costumer: {
				name: "Leonardo Popopo",
				address: {
					street: "Pipipi",
					zipCode: "090909",
					country: "Brasil",
				},
				email: "teste@teste.com",
			},
			deliveryMethod: "fastest",
		};
		axios
			.post("/orders.json", order)
			.then((resp) => {
				this.setState({ loading: false, purchasing: false });
			})
			.catch((err) => {
				this.setState({ loading: false, purchasing: false });
			});
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients,
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null;

		let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

		if (this.state.ingredients) {
			burger = (
				<>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						ingredientAdd={this.addIngredient}
						ingredientRemove={this.removeIngredient}
						disabled={disabledInfo}
						price={this.state.totalPrice}
						purchasable={this.state.purchasable}
						order={this.purchase}
					/>
				</>
			);

			orderSummary = (
				<OrderSummary
					ingredients={this.state.ingredients}
					totalPrice={this.state.totalPrice}
					purchaseCanceled={this.purchaseCancel}
					purchaseContinue={this.purchaseContinue}
				/>
			);
		}

		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		return (
			<>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancel}>
					{orderSummary}
				</Modal>
				{burger}
			</>
		);
	}
}

export default controleDeErros(BurgerBuilder, axios);
