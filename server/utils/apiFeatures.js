class ApiFeatures {
	constructor(mongoQuery, queryString){
		this.mongoQuery = mongoQuery;
		this.queryString = queryString;
	}

	searchByName(){
		var keyword = (this.queryString.keyword) ? {name: {$regex: this.queryString.keyword, $options: 'i'}} : {};
		this.mongoQuery = this.mongoQuery.find({...keyword});
		return this;
	}

	// filterByPrice(){
	// 	const queryStringCopy = {...this.queryString};
	// 	const removeFields = ['keyword', 'page', 'limit'];
	// 	removeFields.forEach(key => delete queryStringCopy[key]);
		
	// 	let queryStr = JSON.stringify(queryStringCopy);
	// 	queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, key => `$${key}`);
	// 	this.mongoQuery = this.mongoQuery.find(JSON.parse(queryStr));

	// 	return this;
	// }

	filterByCategory(){
		const queryStringCopy = {...this.queryString};
		const removeFields = ['keyword', 'page', 'limit'];
		removeFields.forEach(key => delete queryStringCopy[key]);

		var category = (queryStringCopy.category === 'All') ? {} : {category: queryStringCopy.category};
		this.mongoQuery = this.mongoQuery.find({...category});

		return this;
	}

	pagination(resultPerPage){
		const currPage = this.queryString.page || 0;
		this.mongoQuery = this.mongoQuery.skip(currPage*resultPerPage).limit(resultPerPage);

		return this;
	}
}

module.exports = ApiFeatures;