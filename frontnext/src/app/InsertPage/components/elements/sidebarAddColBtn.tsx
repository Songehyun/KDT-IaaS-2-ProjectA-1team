import React from 'react';
import { borderButton } from '@/app/ui/styles/ButtonStyles';
import { useLanguage } from '@/app/ui/SettingMoules/LanguageContext';
import { AddButtonProps } from '@/app/InsertPage/components/interface/sidebarBtnProps';

const AddColumnButton: React.FC<AddButtonProps> = ({ onClick }) => {
  const { language } = useLanguage();
  const texts = {
    ko: '열 추가',
    en: 'Add Column',
    jp: '列を追加',
    cn: '添加列',
    vn: 'Thêm cột',
    th: 'เพิ่มคอลัมน์',
  };

  return (
    <button className={borderButton} onClick={onClick}>
      {texts[language]}
    </button>
  );
};

export default AddColumnButton;
