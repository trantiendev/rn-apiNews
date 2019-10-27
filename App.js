import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import FeedItems from './components/FeedItems';

const API_URL = ''

export default class App extends Component {
  state = {
    isRefreshing: false,
    isLoading: false,
    listArticles: [],
    totalResults: 0,
    page: 1,
    isLoadMore: false
  }

  componentDidMount = async () => {
    const {page} = this.state
    this.setState({ isLoading: true });
    this.callApi(page)
  }

  callApi = async (page) => {
    const { listArticles } = this.state
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=10ee1737c4304ebda5ffea1b8376b1d9&page=${page}`);
    await setTimeout(() => {}, 1000)
    const jsonResponse = await response.json();
    this.setState({ 
      isLoading: false,
      isRefreshing: false,
      page: page,
      listArticles: listArticles.concat(jsonResponse.articles),
      totalResults: jsonResponse.totalResults
    });
  }
  
  onEndReached = async () => {
    const { page } = this.state;
    const newPage = page + 1;
    this.callApi(newPage)
  }

  renderItem = ({item}) => {
    return <FeedItems item={item}/>
  }

  renderFooter = () => {
    const {isRefreshing} = this.state
    if (!isRefreshing) return <ActivityIndicator size="large" animating={true} />
  }

  onRefresh = async () => {
    const newPage = 1
    await this.setState({ isRefreshing: true, listArticles: [], page: newPage })
    setTimeout(() => {
      this.callApi(newPage)
    }, 1000)
  }
  
  render() {
    const { isLoading, listArticles, isRefreshing } = this.state
    if (isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator 
          size="large" 
          animating={isLoading} />
        </View>
      );
    }
    return (
      <View>
        <View style={styles.header}>
          <Text>Articles Count:</Text>
          <Text>{listArticles.length}</Text>
        </View>
        <FlatList
          style={styles.flatList}
          data={listArticles}
          renderItem={this.renderItem}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.8}
          ListFooterComponent={this.renderFooter()}
          onRefresh={this.onRefresh}
          refreshing={isRefreshing}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  flatList: {
    marginHorizontal: 15,
    marginVertical: 15
  },

  header: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
