import React, { FC } from 'react'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'

import Layout from "@/components/layout/Layout"

import { store } from '@/store/store'

import ReduxToast from './ReduxToast'
import HeadProvider from './HeadProvider/HeadProvider'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

const MainProvider: FC<{children: React.ReactNode}> = ({children}) => {
    return (
        <HeadProvider>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <ReduxToast/>
                    <Layout>
                        {children}
                    </Layout>
                </QueryClientProvider>
            </Provider>
        </HeadProvider>
        
    )
}

export default MainProvider