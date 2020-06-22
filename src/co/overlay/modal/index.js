import s from './index.module.styl'
import React from 'react'
import { Portal } from 'react-portal'
import Context from './context'
import Header from './header'
import Content from './content'

export default class Popover extends React.Component {
    static defaultProps = {
        closable: true,
        onClose: undefined      //func, required
    }

    componentDidMount() {
        window.addEventListener('keydown', this.onWindowKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onWindowKeyDown)
    }

    onWindowKeyDown = (e)=>{
        switch(e.key) {
            case 'Escape':
                e.stopPropagation()
                this.props.onClose()
            break
        }
    }

    render() {
        const { children, onClose, closable, className='', ...etc } = this.props

        return (
            <Portal>
                <Context.Provider value={{ onClose, closable }}>
                    <div className={s.modal}>
                        <div className={s.body+' '+className} {...etc}>
                            {children}
                        </div>
                    </div>
                </Context.Provider>
            </Portal>
        )
    }
}

export {
    Header,
    Content
}