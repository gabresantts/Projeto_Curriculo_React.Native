import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView, 
  Platform, 
  Image, 
  TouchableOpacity, 
  Linking,
  Alert, 
} from 'react-native';
import * as Clipboard from 'expo-clipboard'; 
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'; 

const PRIMARY_COLOR = '#1D4ED8'; 
const LIGHT_PRIMARY = '#EFF6FF'; 
const GRAY_TEXT = '#4B5563';
const BORDER_GRAY = '#E5E7EB';

interface Contact {
    type: 'Email' | 'Telefone' | 'GitHub' | 'LinkedIn';
    value: string;
    icon: 'email' | 'phone' | 'github' | 'linkedin'; 
}

interface FormacaoItem {
    instituicao: string;
    curso: string;
    periodo: string;
}

interface ExperienciaItem {
    cargo: string;
    empresa: string;
    periodo: string;
    detalhes: string[];
    descricaoCompleta: string;
}

interface CurriculumData {
    nome: string;
    titulo: string;
    email: string;
    telefone: string;
    cep: string;
    fotoUrl: string;
    contatos: Contact[];
    objetivo: string;
    resumo: string;
    experiencia: ExperienciaItem[];
    formacao: FormacaoItem[];
    habilidadesHard: string[];
    habilidadesSoft: string[];
}

const curriculumData: CurriculumData = {
  nome: "Gabriel Lima Dos Santos",
  titulo: "Analista e Desenvolvedor, Faculdade Senac | Cientista Social e Pesquisador, UFPE",
  email: "gabresantts@gmail.com",
  telefone: "(81) 98431-1471",
  cep: "52191-280",
  fotoUrl: "https://avatars.githubusercontent.com/u/179705386?v=4", 
  
  contatos: [
    { type: 'Email', value: 'gabresantts@gmail.com', icon: 'email' },
    { type: 'Telefone', value: '(81) 98431-1471', icon: 'phone' },
    { type: 'GitHub', value: 'https://github.com/gabresantts', icon: 'github' },
    { type: 'LinkedIn', value: 'https://www.linkedin.com/in/gabresants', icon: 'linkedin' },
  ],

  objetivo: "Desejo atuar com análise, coleta e modelagem de dados na área de TI.",
  
  resumo: "Possuo uma base metodológica robusta na área de pesquisa, coleta e análise de dados, adquirida em Ciências Sociais (UFPE), com proficiência em análise quantitativa (Excel, SPSS) e qualitativa para sistematização de informações. Essa expertise se une às competências técnicas desenvolvidas em projetos de ADS (Faculdade Senac), onde atuei na modelagem e construção de bancos de dados relacionais e não-relacionais (MySQL, MongoDB), além de realizar o tratamento (Data Wrangling) e a visualização de insights em dashboards (Power BI). Meu foco é integrar essas habilidades para transformar o ciclo completo de dados (da coleta à arquitetura de database).",
  
  experiencia: [
    {
      cargo: "Assistente Administrativo (Aprendiz)",
      empresa: "Transportadora Globo",
      periodo: "2022 - 2023",
      detalhes: ["Monitoramento e Segurança", "Apoio a RH e Saúde Ocupacional", "Gestão e Sistematização de Documentação"],
      descricaoCompleta: "Realizei o Controle e Análise Preditiva de filmagens de segurança veicular. Prestei Suporte Administrativo na gestão de fichas médicas. Sistematizei e Organizei a documentação de colaboradores em Banco de Dados Estruturado.",
    },
    {
      cargo: "Pesquisador (Estagiário)",
      empresa: "Universidade Federal de Pernambuco",
      periodo: "08/2022 - 10/2022",
      detalhes: ["Monitoramento de Candidaturas LGBTQIA+", "Coleta, organização e análise de dados (Excel, SPSS)", "Produção de artigo científico"],
      descricaoCompleta: "Monitoramento e Levantamento de Dados das Candidaturas LGBTQIA+ e aliado/as das eleições gerais de 2022. Coleta semanal, organização e sistematização das informações. Criação de banco de dados (Excel, SPSS) e análise de dados.",
    },
    {
      cargo: "Repositor e Embalador (Aprendiz)",
      empresa: "Carrefour LTDA",
      periodo: "2018 - 2019",
      detalhes: ["Abastecer gôndolas", "Embalagem de produtos", "Atendimento ao cliente", "Organização de estoque", "Precificação de produtos"],
      descricaoCompleta: "Organizar e repor mercadorias nas gôndolas, garantindo a disponibilidade dos produtos para os clientes. Embalar produtos de forma eficiente e segura, assegurando a integridade dos itens durante o transporte e entrega.",
    },
  ],
  
  formacao: [
    {
      instituicao: "Universidade Federal de Pernambuco (UFPE)",
      curso: "Bacharelado em Ciências Sociais",
      periodo: "(2019-2025)",
    },
    {
      instituicao: "Faculdade Senac",
      curso: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
      periodo: "Cursando (2024-2026)",
    },
    {
      instituicao: "Aba Education English",
      curso: "Inglês - Intermediário",
      periodo: "(01/25 a 12/25)",
    },
    {
      instituicao: "Microlins",
      curso: "Capacitação em Informática Básica",
      periodo: "(2015-2016)",
    },
  ],

  habilidadesHard: [
    "Java Script", "Python", "HTML", "CSS", "MySQL", "SPSS Statistics", 
    "Scrum | Kanban", "Data Analysis | Database", "Power BI", "Figma", "Miro", "Canva",
  ],
  habilidadesSoft: [
    "Trabalho em equipe", "Gestão do tempo", "Pensamento crítico", "Flexibilidade e adaptabilidade", "Resolução de problemas",
  ],
};

type ContactType = 'Email' | 'Telefone' | 'GitHub' | 'LinkedIn';

const handleContactPress = async (type: ContactType, value: string) => {
  if (type === 'Email') {
    await Clipboard.setStringAsync(value);
    Alert.alert("Sucesso", `Email ${value} copiado!`);
  } else if (type === 'Telefone') {
    Linking.openURL(`tel:${value.replace(/\D/g, '')}`);
  } else if (type === 'GitHub' || type === 'LinkedIn') {
    Linking.openURL(value).catch(err => Alert.alert('Erro', `Não foi possível abrir o link: ${value}`));
  }
};

interface SectionTitleProps {
    title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => (
    <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
    </View>
);

interface ListItemProps {
    title: string;
    institution: string;
    period: string;
}

const ListItem: React.FC<ListItemProps> = ({ title, institution, period }) => (
    <View style={styles.listItem}>
        <Text style={styles.listItemTitle}>{title}</Text>
        <Text style={styles.listItemSubtitle}>{institution}</Text>
        <Text style={styles.listItemPeriod}>{period}</Text>
    </View>
);

const renderSkills = (skills: string[]) => (
    <View style={styles.skillsContainer}>
        {skills.map((skill: string, index: number) => (
            <View key={index} style={styles.skillBadge}>
                <Text style={styles.skillText}>{skill}</Text>
            </View>
        ))}
    </View>
);

interface ContactLinkProps {
    type: ContactType;
    value: string;
    iconName: Contact['icon']; 
}

const ContactLink: React.FC<ContactLinkProps> = ({ type, value, iconName }) => {
    return (
        <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => handleContactPress(type, value)}
        >
            {type === 'GitHub' && <FontAwesome name="github" size={20} color={PRIMARY_COLOR} style={{marginRight: 8}}/>}
            {type === 'LinkedIn' && <FontAwesome name="linkedin" size={20} color={PRIMARY_COLOR} style={{marginRight: 8}}/>}
            
            {type !== 'GitHub' && type !== 'LinkedIn' && (
                <MaterialIcons name={iconName as 'email' | 'phone'} size={20} color={PRIMARY_COLOR} style={{marginRight: 8}}/>
            )}
            
            <Text style={styles.contactText}>{value}</Text>
        </TouchableOpacity>
    );
};


const App: React.FC = () => {
    
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                <View style={styles.mainContainer}>

                    <View style={styles.header}>
                        <Image
                            source={{ uri: curriculumData.fotoUrl }}
                            style={styles.profileImage}
                            accessibilityLabel="Foto de Perfil do Candidato"
                        />
                        <Text style={styles.name}>{curriculumData.nome}</Text>
                        <Text style={styles.title}>{curriculumData.titulo}</Text>
                        
                        <View style={styles.contactGroup}>
                            {curriculumData.contatos.map((c: Contact) => (
                                <ContactLink key={c.type} type={c.type} value={c.value} iconName={c.icon} />
                            ))}
                        </View>
                    </View>

                    <SectionTitle title="Objetivo" />
                    <View style={styles.sectionContent}>
                        <Text style={styles.bodyText}>{curriculumData.objetivo}</Text>
                    </View>

                    <SectionTitle title="Sobre Mim" />
                    <View style={styles.sectionContent}>
                        <Text style={styles.bodyText}>{curriculumData.resumo}</Text>
                    </View>

                    <SectionTitle title="Formação Acadêmica" />
                    <View style={styles.tableContainer}>
                        <View style={[styles.tableRow, styles.tableHeader]}>
                            <Text style={[styles.tableCell, styles.tableCellTitle, styles.tableHeaderCell]}>Curso</Text>
                            <Text style={[styles.tableCell, styles.tableCellInstitution, styles.tableHeaderCell]}>Instituição</Text>
                            <Text style={[styles.tableCell, styles.tableCellPeriod, styles.tableHeaderCell]}>Período</Text>
                        </View>
                        {curriculumData.formacao.map((item: FormacaoItem, index: number) => (
                            <View 
                                key={index} 
                                style={[
                                    styles.tableRow, 
                                    index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
                                ]}
                            >
                                <Text style={[styles.tableCell, styles.tableCellTitleData]}>{item.curso}</Text>
                                <Text style={[styles.tableCell, styles.tableCellInstitution]}>{item.instituicao}</Text>
                                <Text style={[styles.tableCell, styles.tableCellPeriod]}>{item.periodo}</Text>
                            </View>
                        ))}
                    </View>

                    <SectionTitle title="Experiência Profissional" />
                    <View style={styles.sectionContent}>
                        {curriculumData.experiencia.map((job: ExperienciaItem, index: number) => (
                            <View key={index} style={styles.experienceBlock}>
                                <Text style={styles.experienceTitle}>{job.cargo} na {job.empresa}</Text>
                                <Text style={styles.experiencePeriod}>{job.periodo}</Text>
                                <Text style={styles.experienceDescription}>{job.descricaoCompleta}</Text>
                                {job.detalhes.length > 0 && (
                                    <View style={styles.experienceDetails}>
                                        {job.detalhes.map((detail: string, i: number) => (
                                            <Text key={i} style={styles.experienceDetailItem}>• {detail}</Text>
                                        ))}
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>

                    <SectionTitle title="Habilidades" />
                    <View style={styles.sectionContent}>
                        <Text style={styles.skillGroupTitle}>Hard Skills (Técnicas):</Text>
                        {renderSkills(curriculumData.habilidadesHard)}
                        
                        <Text style={[styles.skillGroupTitle, { marginTop: 15 }]}>Soft Skills (Comportamentais):</Text>
                        {renderSkills(curriculumData.habilidadesSoft)}
                    </View>

                </View>

            </ScrollView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>© 2025 Gabriel Gleydson Lima Dos Santos. React Native App.</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6', 
    paddingTop: Platform.OS === 'android' ? 35 : 0, 
  },
  scrollContent: {
      paddingBottom: 20, 
  },
  mainContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF', 
    margin: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  
  header: {
    alignItems: 'center',
    marginBottom: 25,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_GRAY,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 4,
    borderColor: PRIMARY_COLOR,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1F2937', 
    textAlign: 'center',
    marginTop: 5,
  },
  title: {
    fontSize: 16,
    color: GRAY_TEXT, 
    marginBottom: 15,
    textAlign: 'center',
  },
  contactGroup: {
      width: '100%',
      paddingHorizontal: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: LIGHT_PRIMARY, 
    borderRadius: 8,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  contactText: {
    fontSize: 14,
    color: PRIMARY_COLOR, 
    fontWeight: '600',
    flexShrink: 1, 
  },

  sectionTitleContainer: {
    borderBottomWidth: 2,
    borderBottomColor: PRIMARY_COLOR,
    marginBottom: 15,
    paddingBottom: 5,
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: PRIMARY_COLOR, 
  },
  sectionContent: {
      marginBottom: 20,
  },
  bodyText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },

    listItem: {
        marginBottom: 10,
        paddingLeft: 10,
        borderLeftWidth: 3,
        borderLeftColor: BORDER_GRAY,
    },
    listItemTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    listItemSubtitle: {
        fontSize: 14,
        color: GRAY_TEXT,
    },
    listItemPeriod: {
        fontSize: 13,
        color: GRAY_TEXT,
        fontStyle: 'italic',
    },
  
  tableContainer: {
    borderWidth: 1,
    borderColor: BORDER_GRAY,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: BORDER_GRAY,
  },
  tableHeader: {
      backgroundColor: PRIMARY_COLOR, 
      borderBottomWidth: 0, 
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 14,
  },
  tableRowEven: {
      backgroundColor: '#F9FAFB', 
  },
  tableRowOdd: {
      backgroundColor: '#FFFFFF', 
  },
  tableCell: {
    padding: 12,
    fontSize: 13,
    flex: 1,
    color: '#374151',
  },
  tableCellTitle: {
      flex: 2, 
  },
  tableCellTitleData: {
    fontWeight: '600',
    color: PRIMARY_COLOR,
    flex: 2, 
  },
  tableCellInstitution: {
      flex: 1.5,
  },
  tableCellPeriod: {
      flex: 1,
  },
  
  experienceBlock: {
    borderLeftWidth: 4,
    borderLeftColor: PRIMARY_COLOR,
    paddingLeft: 10,
    marginBottom: 20,
  },
  experienceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  experiencePeriod: {
    fontSize: 13,
    fontStyle: 'italic',
    color: GRAY_TEXT,
    marginBottom: 8,
  },
  experienceDescription: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 5,
  },
  experienceDetails: {
      marginTop: 5,
      paddingLeft: 5,
  },
  experienceDetailItem: {
      fontSize: 13,
      color: GRAY_TEXT,
      marginBottom: 2,
  },
  
  skillGroupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 5,
    marginBottom: 5,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  skillBadge: {
    backgroundColor: LIGHT_PRIMARY,
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    color: PRIMARY_COLOR, 
    fontSize: 13,
    fontWeight: '500',
  },
  
  footer: {
    backgroundColor: PRIMARY_COLOR,
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerText: {
    fontSize: 12,
    color: 'white',
  }
});

export default App;