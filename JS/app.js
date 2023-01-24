// Constants
const WITHDRAW_MONEY = "WITHDRAW_MONEY";
const DEPOSITE_MONEY = "DEPOSITE_MONEY";
const ADD_PRODUCT = "ADD_PRODUCT";
const GET_PRODUCTS = "GET_PRODUCTS";

// Action Creators
const withdraw = (amount) => {
  return {
    type: WITHDRAW_MONEY,
    payload: amount,
  };
};

const deposit = (amount) => {
  return {
    type: DEPOSITE_MONEY,
    payload: amount,
  };
};

const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
};

const getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    payload: products,
  };
};

const fetchProducts = () => {
  return async (dispatch) => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    console.log(data);
    dispatch(getProducts(data));
  };
};

// Reducers
const bankReducer = (state = 1000, action) => {
  switch (action.type) {
    case WITHDRAW_MONEY:
      return state - action.payload;
    case DEPOSITE_MONEY:
      return state + action.payload;
    default:
      return state;
  }
};

const productReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return [...state, ...action.payload];
    case ADD_PRODUCT:
      return [...state, action.payload];
    default:
      return state;
  }
};

// Combine Reducers
const appReduces = Redux.combineReducers({
  bank: bankReducer,
  product: productReducer,
});

// Store
const store = Redux.createStore(appReduces, Redux.applyMiddleware(ReduxThunk));

// Actions Dispatchers
// store.dispatch(withdraw(100));
// store.dispatch(withdraw(200));
// store.dispatch(deposit(500));
// store.dispatch(fetchProducts());
// store.dispatch(addProduct({ id: 1, title: "product-1" }));

// store.getState() => it gets the state once
console.log(store.getState());

let amountValue = document.querySelector("#value");
amountValue.innerHTML = store.getState().bank;
let amountInput = document.querySelector("#amount");

document.querySelector("#withdraw").addEventListener("click", () => {
  store.dispatch(withdraw(+amountInput.value));
});

document.querySelector("#deposit").addEventListener("click", () => {
  store.dispatch(deposit(+amountInput.value));
});

// store.subscribe => Works with every change in the state
store.subscribe(() => {
  console.log("CURRENT STATE", store.getState());
  amountValue.innerHTML = store.getState().bank;
});
