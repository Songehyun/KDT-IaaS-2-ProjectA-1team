import React, { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Modal from '@/app/ui/Modal-Test/modalComponent';
import ConfirmSaveModal from '../components/modals/ConfirmSaveModal';
import ConfirmNavigateModal from '../components/modals/ConfirmNavigateModal';
import TableData from '../components/TableData';
import { useTableDataManagement } from '../components/TableFunctions';
import TotalStyles from '../../styles/TotalStyles';
import { useLanguage } from '../../SettingMoules/LanguageContext';

const TotalSidebar: React.FC = () => {
  const {
    showModal,
    setShowConfirmModal,
    setShowNavigateModal,
    showConfirmModal,
    showNavigateModal,
    selectedTable,
    headers,
    editableHeaders,
    tableData,
    headerErrors,
    toggleModal,
    handleTableClick,
    handleSave,
    confirmSave,
    confirmNavigate,
    handleDataChange,
    handleAddRow,
    handleAddColumn,
    handleHeaderChange,
    handleDeleteColumn,
  } = useTableDataManagement();

  const { language } = useLanguage();
  const texts = {
    ko: {
      mainContent: '메인 콘텐츠',
      save: '저장',
    },
    en: {
      mainContent: 'Main Content',
      save: 'Save',
    },
    jp: {
      mainContent: 'メインコンテンツ',
      save: '保存',
    },
    cn: {
      mainContent: '主要内容',
      save: '保存',
    },
    vn: {
      mainContent: 'Nội dung chính',
      save: 'Lưu',
    },
    th: {
      mainContent: 'เนื้อหาหลัก',
      save: 'บันทึก',
    },
  };

  const [showSuccessModal, setShowSuccessModal] = useState(false); // 성공 모달 상태 추가

  const handleSaveAndShowModal = async () => {
    await handleSave();
    setShowSuccessModal(true); // 저장 후 성공 모달 표시
  };

  const handleConfirmAndSave = async () => {
    await confirmSave(); // "정말로 저장하시겠습니까?" 확인 모달에서 확인을 누를 때 데이터 저장
    setShowSuccessModal(true); // 저장 후 성공 모달 표시
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    // 추가 동작이 필요하면 여기에 추가
  };

  return (
    <div className={TotalStyles.SidebarContainer}>
      <Sidebar
        onTableClick={handleTableClick}
        onAddRow={handleAddRow}
        onAddColumn={handleAddColumn}
      />

      <Modal show={showModal} onClose={toggleModal}>
        <div className={TotalStyles.LoginMessageContainer}>
          {/* 모달 콘텐츠 */}
        </div>
      </Modal>

      <ConfirmSaveModal
        show={showConfirmModal}
        onConfirm={handleConfirmAndSave} // 수정된 부분: 저장 후 성공 모달을 띄우는 핸들러로 연결
        onClose={() => setShowConfirmModal(false)}
      />

      <ConfirmNavigateModal
        show={showNavigateModal}
        onConfirm={confirmNavigate}
        onClose={() => setShowNavigateModal(false)}
      />

      <div className={TotalStyles.SidebarMainContent}>
        <h1 className={TotalStyles.SidebarMainTitle}>
          {texts[language].mainContent}
        </h1>

        {selectedTable && (
          <div>
            <h2 className={TotalStyles.SidebarTableTitle}>{selectedTable}</h2>
            <div>
              <TableData
                data={tableData}
                onDataChange={handleDataChange}
                headers={headers}
                editableHeaders={editableHeaders}
                onHeaderChange={handleHeaderChange}
                onDeleteRow={(rowIndex: number) => {
                  const newData = [...tableData];
                  newData.splice(rowIndex, 1);
                  handleDataChange(newData);
                }}
                onDeleteColumn={handleDeleteColumn}
                headerErrors={headerErrors}
              />
            </div>
            <button
              className={TotalStyles.SidebarSaveButton}
              onClick={() => setShowConfirmModal(true)} // 수정된 부분: 저장 확인 모달을 띄우는 핸들러 사용
            >
              {texts[language].save}
            </button>
          </div>
        )}
      </div>

      {/* 성공 모달 */}
      <Modal show={showSuccessModal} onClose={handleSuccessModalClose}>
        <div className="text-center">
          <p className={TotalStyles.ModalText}>
            데이터가 성공적으로 업데이트되었습니다.
          </p>
          <button
            className={TotalStyles.ModalConfirmButton}
            onClick={handleSuccessModalClose}
          >
            확인
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TotalSidebar;
