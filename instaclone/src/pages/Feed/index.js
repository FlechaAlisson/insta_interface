import React, {useState, useEffect, useCallback} from 'react';
import { View, FlatList } from 'react-native';

// import { Container } from './styles';

import{ Post, Header, Avatar, Name , Description, Loading} from './styles'
import LazyImage from '../../components/LazyImage'

export default function Feed() {
    const [feed, setFeed] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefresing] = useState(false)
    const [viewable, setViewable] = useState([])




    async function loadPage(pageNumber = page, shouldRefresh = false) {
        if (total && pageNumber > total) return;

        setLoading(true)

        const response = await fetch(
            `http://localhost:3000/feed/?_expand=author&_limit=5&_page=${pageNumber}`
            )
        const data = await response.json()
        const totalItens = response.headers.get('X-Total-Count')


        setTotal(Math.floor(totalItens / 5)) //pega o total de itens e divide pelo quanto de itens ele ta recebendo
        setFeed(shouldRefresh? data : [... feed, ...data]) // para acresentar no feed o que veio no data sem subescrever
        setPage(pageNumber + 1)                            // se o shouldreshes for true entao ele descarta tudo e comceca de novo
        
        setLoading(false)

    }
    
    useEffect(( ) =>{ loadPage() }, []); 
    
    
    const handleViewableChanged = useCallback(({ changed }) => {
        setViewable(changed.map(({item}) => item.id)) //pra pegar os ids so de quem ta visivel
    }, [])

    async function refreshList() {
        setRefresing(true)

        await loadPage(1, true)

        setRefresing(false)
    }

    return (
    <View>
            <FlatList
                data={feed}
                keyExtractor = {post => String(post.id) }
                onEndReached={() => loadPage()}
                onEndReachedThreshold={0.1} //ao chegar em 10% ele carrega mais
                ListFooterComponent = {loading && <Loading/>}
                onRefresh={refreshList}
                refreshing={refreshing}
                onViewableItemsChanged={handleViewableChanged}
                renderItem = {({item}) => (
                    <Post>
                        <Header>
                            <Avatar source={{uri: item.author.avatar}}/>
                            <Name>{item.author.name}</Name>
                        </Header>
                            <LazyImage
                                shouldLoad ={viewable.includes(item.id)}
                                aspectRatio={item.aspectRatio}  
                                smallSource={{uri: item.small}}
                                Source={{uri: item.image}}
                            />
                            <Description>
                                <Name>{item.author.name}</Name> {item.description}
                            </Description>
                    </Post>
                )}
            />
    </View>
  );
}
