package nk.mframe.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import nk.mframe.dto.QuotationDTO;
import nk.mframe.model.Quotation;
import nk.mframe.repositories.QuotationRepository;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuotationServiceImp implements QuotationService{
    private final QuotationRepository quotationRepository;

    public QuotationServiceImp(QuotationRepository quotationRepository) {
        this.quotationRepository = quotationRepository;
    }

//    @Override
//    public Quotation getQuotationByName(String nameQuotation) {
//        return quotationRepository.findQuotationByName(nameQuotation);
//    }

    @Override
    public Quotation getQuotationById(Integer id) {
        return quotationRepository.findQuotationById(id);
    }

    @Transactional
    public QuotationDTO saveQuotation(QuotationDTO quotationDTO) {
        Quotation quotation = Quotation.builder()
                .nameQuotation(quotationDTO.getNameQuotation())
                .build();
        quotationRepository.save(quotation);
        return quotationDTO;
    }

    @Transactional
    @Override
    public void deleteQuotation(Integer id) {
        quotationRepository.deleteById(id);
    }

    @Override
    public List<QuotationDTO> getAllQuotes() {
        return quotationRepository.findAll().stream().map(Quotation::toQuotationDto).sorted(Comparator.comparing(QuotationDTO::getId)).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public QuotationDTO updateQuotation(QuotationDTO quotationDTO, Integer id) {
        Quotation quotation = quotationRepository
                .findById(id)
                .orElseThrow(); // Нужен Exception на проверку существования команды, возможно
        quotation.setNameQuotation(quotationDTO.getNameQuotation());
        quotationRepository.save(quotation);
        return quotationDTO;
    }
}
