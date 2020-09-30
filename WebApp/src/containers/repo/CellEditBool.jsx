import React from 'react'
import PropTypes from 'prop-types';

export default class QualityRanger extends React.Component {
    static propTypes = {
        value: PropTypes.bool,
        onUpdate: PropTypes.func.isRequired
    }
    static defaultProps = {
        value: false
    }
    getValue() {
        return this.range.value;
    }
    render() {
        const { value, onUpdate, ...rest } = this.props;
        return [
            <input
                {...rest}
                key="range"
                ref={node => this.range = node}
                type="range"
                min="0"
                max="100"
            />,
            <button
                key="submit"
                className="btn btn-default"
                onClick={() => onUpdate(this.getValue())}
            >
                done
        </button>
        ];
    }
}