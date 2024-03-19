import React, { useEffect, useRef, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import CustomWebView from '../../components/CustomWebView';

export default () => {
    
    return (
        <CustomWebView uri="alarm" />
    );
}